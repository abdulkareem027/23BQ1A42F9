const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getPriorityNotifications = (
  notifications
) => {
  return [...notifications]
    .sort((a, b) => {
      const diff =
        weights[b.Type] -
        weights[a.Type];

      if (diff !== 0) return diff;

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    })
    .slice(0, 10);
};