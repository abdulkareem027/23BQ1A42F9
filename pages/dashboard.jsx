import { useEffect, useState } from "react";

import { getNotifications } from "../services/notificationService";
import { Log } from "../services/logger";

import { getPriorityNotifications }
from "../utils/priorityHelper";

export default function Dashboard() {

  const [notifications,setNotifications] =
  useState([]);

  const [priority,setPriority] =
  useState([]);

  useEffect(() => {
    Log("frontend", "info", "page", "Dashboard loaded");

    loadData();

  }, []);

  const loadData = async () => {

    const data =
      await getNotifications(
        1,
        50,
        ""
      );

    setNotifications(data);

    setPriority(
      getPriorityNotifications(data)
    );
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>Campus Notifications</h1>
          <p>Latest announcements and priority alerts for your campus.</p>
        </div>
      </header>

      <section className="notification-section">
        <h2>Priority Notifications</h2>
        <div className="notification-grid">
          {priority.length > 0 ? (
            priority.map((item) => (
              <div key={item.ID} className="notification-card priority-card">
                <p>{item.Message}</p>
              </div>
            ))
          ) : (
            <div className="notification-card empty-card">
              No priority notifications available.
            </div>
          )}
        </div>
      </section>

      <section className="notification-section">
        <h2>All Notifications</h2>
        <div className="notification-grid">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div key={item.ID} className="notification-card">
                <p>{item.Message}</p>
              </div>
            ))
          ) : (
            <div className="notification-card empty-card">
              No notifications available.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}