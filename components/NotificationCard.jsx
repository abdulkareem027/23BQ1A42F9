import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

export default function NotificationCard({
  notification,
  viewed,
  onClick,
}) {
  return (
    <Card
      sx={{
        mt: 2,
        border: viewed
          ? "1px solid #ccc"
          : "2px solid blue",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.Type}
        </Typography>

        <Typography>
          {notification.Message}
        </Typography>

        <Typography variant="caption">
          {notification.Timestamp}
        </Typography>

        {!viewed && (
          <Chip
            label="NEW"
            color="primary"
            sx={{ ml: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}