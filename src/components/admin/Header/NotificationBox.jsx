import { Menu, Divider, Text, Box, Loader } from "@mantine/core";
import { useState, useRef } from "react";

const mockNotifications = [
  { notificationId: 1, message: "You have a new appointment", isRead: false },
  { notificationId: 2, message: "New feedback received", isRead: true },
  { notificationId: 3, message: "Doctor updated your record", isRead: false },
  { notificationId: 4, message: "Promotion: 20% off today", isRead: true },
];

const NotificationBox = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef(null);

  return (
    <>
      <Box
        ref={boxRef}
        w={300}
        mah={isShowMore ? 600 : 300}
        style={{ overflowY: "auto" }}
      >
        {mockNotifications.map((item) => (
          <Menu.Item py={20} key={item.notificationId}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.message}</Text>

              {!item.isRead && (
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    marginLeft: 8,
                  }}
                ></Box>
              )}
            </Box>
          </Menu.Item>
        ))}
      </Box>

      {isLoading && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
          }}
        >
          <Loader color="blue" size={20} />
        </Box>
      )}

      <Divider />

      <Text
        c="blue"
        align="center"
        className="hover:underline cursor-pointer"
        onClick={() => {
          setIsShowMore((prev) => !prev);
        }}
      >
        {isShowMore ? "Less" : "More"}
      </Text>
    </>
  );
};

export default NotificationBox;
