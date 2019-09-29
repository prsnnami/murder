import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";

export default function useSocket(location, events) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let s = io.connect(location, {
      reconnection: true
    });
    setSocket(s);
    s.on("connection", data => {
      Cookies.set("uid", data.user.uid);
    });

    Object.keys(events).forEach(event => {
      s.on(event, events[event]);
    });

    return () => {
      s.disconnect();
    };
  }, []);
  return socket;
}
