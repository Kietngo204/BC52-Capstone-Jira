import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialItems = {
  "Group 1": [
    { id: "item-1", content: "Item 1" },
    { id: "item-2", content: "Item 2" },
    { id: "item-3", content: "Item 3" },
  ],
  "Group 2": [],
  "Group 3": [],
  "Group 4": [],
};

function Profile() {
  const [items, setItems] = useState(initialItems);

  // Tạo danh sách groups dựa trên keys của initialItems
  const groups = Object.keys(initialItems);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Ngăn cản xảy ra lỗi khi không có điểm đến
    if (!destination) {
      return;
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

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {groups.map((group) => (
            <Droppable key={group} droppableId={group}>
              {(provided, snapshot) => {
                console.log(provided);
                return (
                  <div
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "lightgrey",
                      padding: 8,
                      width: 200,
                    }}
                  >
                    <h3>{group}</h3>
                    {items[group].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 8,
                              margin: "0 0 8px 0",
                              background: snapshot.isDragging
                                ? "lightgreen"
                                : "grey",
                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Profile;
