import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetail, updateStatus } from "../../../apis/projectAPI";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Button,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopoverListMember from "../../../components/Popover/PopoverListMember";
import BugReportIcon from "@mui/icons-material/BugReport";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const [anchorElListMember, setAnchorElListMember] = useState(null);

  const { data: projectDetail = [], isLoading } = useQuery({
    queryKey: ["projectEdit", projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });

  const handleUpdateStatus = async (taskId, statusId) => {
    try {
      const response = await updateStatus({
        taskId: taskId,
        statusId: statusId,
      });
      return response.data?.content;
    } catch (error) {
      console.log(error);
    }
  };

  const [items, setItems] = useState({});

  // console.log(Object.keys(items));
  const handleClickListMember = (event) => {
    setAnchorElListMember(event.currentTarget);
  };

  const handleCloseListMember = () => {
    setAnchorElListMember(null);
  };

  console.log(projectDetail);

  const onDragEnd = (result) => {
    const { source, destination, draggableId, taskId } = result;

    // Ngăn cản xảy ra lỗi khi không có điểm đến
    if (!destination) {
      return;
    }

    // Xác định trạng thái mới và trạng thái cũ
    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    // Trích xuất taskName từ draggableId
    const taskName = draggableId;

    // Tìm item có taskName tương ứng trong danh sách items
    const draggedItem = Object.values(items).find((status) =>
      status.find((item) => item.taskName === taskName)
    );

    if (sourceStatus !== destinationStatus) {
      console.log("taskId: ", taskId);
      console.log("destinationStatus: ", destinationStatus);
      // Nếu công việc đã bị kéo vào một nhóm khác, gọi API để cập nhật trạng thái
      handleUpdateStatus(draggedItem[0].taskId, destinationStatus);
    }

    if (source.droppableId === destination.droppableId) {
      // Kéo mục trong cùng một nhóm
      const updatedItems = { ...items };
      const updatedGroup = [...updatedItems[source.droppableId]];

      updatedGroup.splice(source.index, 1);
      updatedGroup.splice(
        destination.index,
        0,
        items[source.droppableId][source.index]
      );

      updatedItems[source.droppableId] = updatedGroup;
      setItems(updatedItems);
    } else {
      // Kéo mục qua các nhóm khác nhau
      const sourceGroup = [...items[source.droppableId]];
      const destGroup = [...items[destination.droppableId]];
      const [draggedItem] = sourceGroup.splice(source.index, 1);

      destGroup.splice(destination.index, 0, draggedItem);

      const updatedItems = {
        ...items,
        [source.droppableId]: sourceGroup,
        [destination.droppableId]: destGroup,
      };

      setItems(updatedItems);
    }
  };

  function limitText(text, limit) {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  }

  useEffect(() => {
    if (projectDetail && projectDetail.lstTask) {
      const initialItems = {};
      projectDetail.lstTask.forEach((status) => {
        initialItems[status.statusId] = status.lstTaskDeTail || [];
      });
      setItems(initialItems);
    }
  }, [projectDetail]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#172B4D",
              textTransform: "uppercase",
            }}
          >
            {projectDetail.projectName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl
              sx={{ m: "16px 16px 16px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-search">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Box
              display={"flex"}
              onClick={(event) => {
                handleClickListMember(event);
              }}
            >
              {projectDetail.members.slice(0, 2).map((member) => {
                return (
                  <Avatar
                    alt={member.name}
                    src={member.avatar}
                    key={member.userId}
                  />
                );
              })}
              {projectDetail.members.length > 2 && (
                <Fab
                  size="small"
                  color="warning"
                  aria-label="add"
                  sx={{ boxShadow: "none", marginRight: "3px" }}
                >
                  +{projectDetail.members.length - 2}
                </Fab>
              )}
            </Box>
          </Box>

          <Box>
            <Button
              color="warning"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginLeft: "8px" }}
            >
              Task
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(items).map((statusId) => {
              const status = items[statusId];
              const statusData = projectDetail.lstTask.find(
                (task) => task.statusId === statusId
              );
              // Đếm số lượng ISSUES trong mỗi group
              const numberOfIssues = status.length;
              // console.log(status);
              // console.log(statusData);
              return (
                <Droppable key={statusId} droppableId={statusId}>
                  {(provided, snapshot) => {
                    return (
                      <Box
                        sx={{ padding: "0 8px", backgroundColor: "#f4f5f7" }}
                        ref={provided.innerRef}
                      >
                        <Box sx={{ padding: "0 8px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "12px 8px",
                            }}
                          >
                            <Typography
                              sx={{
                                textTransform: "uppercase",
                                fontWeight: "500",
                                color: " rgb(94 108 132)",
                                fontSize: "11px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                paddingRight: "8px",
                              }}
                            >
                              {limitText(statusData.statusName, 16)}
                            </Typography>
                            <Typography
                              sx={{
                                textTransform: "uppercase",
                                fontWeight: "500",
                                color: " rgb(94 108 132)",
                                fontSize: "10px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {numberOfIssues} ISSUES
                            </Typography>
                          </Box>
                          {status.map((item, index) => {
                            console.log(item);
                            return (
                              <Draggable
                                key={item.taskName}
                                draggableId={item.taskName}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Box
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{
                                        userSelect: "none",
                                        padding: "12px",
                                        margin: "0 0 12px 0",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        background: snapshot.isDragging
                                          ? "#ffffffda"
                                          : "#fff",
                                        minHeight: "120px",
                                        ...provided.draggableProps.style,
                                        transition: "all 0.5s",

                                        ":hover": {
                                          backgroundColor: "#f4f5f7",
                                          boxShadow:
                                            "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                        },
                                      }}
                                    >
                                      <Typography
                                        component={"h6"}
                                        sx={{
                                          color: "#000000d8",
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {item.taskName}
                                      </Typography>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          display={"flex"}
                                          alignItems={"center"}
                                        >
                                          {item.taskTypeDetail.taskType ===
                                          "bug" ? (
                                            <BugReportIcon
                                              color="error"
                                              sx={{ fontSize: "17px" }}
                                            />
                                          ) : (
                                            <CheckBoxIcon
                                              color="success"
                                              sx={{ fontSize: "17px" }}
                                            />
                                          )}
                                          {item.priorityTask.priority ===
                                          "Medium" ? (
                                            <NorthIcon
                                              sx={{
                                                fontSize: "14px",
                                                margin: "0 5px",
                                              }}
                                            />
                                          ) : (
                                            <SouthIcon
                                              sx={{
                                                fontSize: "14px",
                                                margin: "0 5px",
                                              }}
                                            />
                                          )}
                                          <Typography sx={{ fontSize: "12px" }}>
                                            {item.priorityTask.priority}
                                          </Typography>
                                        </Box>

                                        <Box display={"flex"}>
                                          {item.assigness
                                            .slice(0, 2)
                                            .map((member) => {
                                              return (
                                                <Avatar
                                                  alt={member.name}
                                                  src={member.avatar}
                                                  sx={{ width: 29, height: 29 }}
                                                  key={member.id}
                                                />
                                              );
                                            })}
                                          {projectDetail.members.length > 2 && (
                                            <Fab
                                              size="small"
                                              color="warning"
                                              aria-label="add"
                                              sx={{
                                                boxShadow: "none",
                                                marginRight: "3px",
                                              }}
                                            >
                                              +
                                              {projectDetail.members.length - 2}
                                            </Fab>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}{" "}
                          {/* Đảm bảo thêm placeholder */}
                        </Box>
                      </Box>
                    );
                  }}
                </Droppable>
              );
            })}
          </DragDropContext>
        </Box>
      </Box>
      <PopoverListMember
        anchorEl={anchorElListMember}
        handleClose={handleCloseListMember}
        projectDetail={projectDetail}
      />
    </>
  );
}
