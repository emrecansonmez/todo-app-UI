import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";

interface Task {
  key: number;
  title: string;
  description: string;
  priority: string;
}

const StickyWall: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Rastgele görevler üret (12 görev, 4 sütun 3 satır)
    const generatedTasks = Array.from({ length: 12 }, (_, index) => ({
      key: index + 1,
      title: `Task ${index + 1}`,
      description: `Description for task ${index + 1}`,
      priority: "High",
    }));

    setTasks(generatedTasks);
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {tasks.map((task) => (
          <Col
            key={task.key}
            xs={24} // Mobil ekranlarda 1 sütun
            sm={12} // Küçük ekranlarda 2 sütun
            md={6} // Orta ve büyük ekranlarda 4 sütun
          >
            <Card
              title={task.title}
              bordered={false}
              style={{
                backgroundColor: "#ffe6e6", // Kırmızımsı kağıt rengi
                border: "1px solid #ff4d4f", // Kırmızı kenarlık
                minHeight: "200px", // Minimum yükseklik
                boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)", // Hafif gölge
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default StickyWall;
