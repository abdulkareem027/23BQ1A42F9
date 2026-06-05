import NotificationCard from "./NotificationCard";

export default function PriorityNotifications({
  notifications,
}) {
  return (
    <>
      {notifications.map((item) => (
        <NotificationCard
          key={item.ID}
          notification={item}
          viewed={false}
        />
      ))}
    </>
  );
}