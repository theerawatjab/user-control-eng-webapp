"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Space,
  Table,
  TableProps,
  Typography,
  Tooltip,
  InputNumber,
} from "antd";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { convertDateTimeFormate, convertDateTimeToNumber } from "@/app/utils";

export default function SystemIndexPage() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [systems, setSystems] = useState<SystemList>({
    data: [],
    page: 0,
    totalPage: 1,
    limit: 0,
    totalCount: 0,
  });
  const [currentSearch, setcurrentSearch] = useState({
    webKey: "",
    name: "",
  });

  const columns: TableProps["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "คีย์ระบบ",
      onHeaderCell: () => {
        return { style: { textAlign: "center" } }; // Center-align the header
      },
      align: "left",
      dataIndex: "webKey",
      key: "webKey",
      sorter: (a, b) => a.webKey.length - b.webKey.length,
    },
    {
      title: "ชื่อ",
      onHeaderCell: () => {
        return { style: { textAlign: "center" } }; // Center-align the header
      },
      align: "left",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "แก้ไขล่าสุด",
      align: "center",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) =>
        convertDateTimeToNumber(a.updatedAt) -
        convertDateTimeToNumber(b.updatedAt),
      render: (_, record) => {
        return convertDateTimeFormate(record.updatedAt);
      },
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: "10%",
      render: (_, record) => {
        return (
          <Row
            gutter={[16, 16]}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Col span={8}>
              <Tooltip title="Detail">
                <Icons.BookOpenText
                  onClick={() => {
                    setLoading(true);
                    router.push(`/private/system/${record.uid}`);
                  }}
                  size={16}
                />
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  const fetchSystem = async () => {
    try {
      const data = {
        data: [
          {
            id: 1,
            webKey: "xxx",
            name: "ระบบบุคลากร",
            description: "xxxx",
            updatedAt: "2025-07-03T10:15:23Z",
            createdAt: "2025-07-03T10:15:23Z",
          },
          {
            id: 2,
            webKey: "xxx",
            name: "ระบบลา",
            description: "xxxx",
            updatedAt: "2025-07-03T10:17:45Z",
            createdAt: "2025-07-03T10:15:23Z",
          },
          {
            id: 3,
            webKey: "xxx",
            name: "ระบบใช้รถ",
            description: "xxxx",
            updatedAt: "2025-07-03T10:18:12Z",
            createdAt: "2025-07-03T10:15:23Z",
          },
        ],
        page: 1,
        totalPage: 1,
        limit: 10,
        totalCount: 3,
      };
      setSystems(data);
      setLoading(false);
      setTableLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
      setTableLoading(false);
    }
  };

  const onPageChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onSearch = () => {
    setcurrentSearch({
      webKey: form.getFieldValue("webKey"),
      name: form.getFieldValue("name"),
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    setTableLoading(true);
    fetchSystem();
  }, [currentPage, currentSearch]);

  return (
    <>
      <div style={{ padding: 10 }}>
        <Space direction="vertical" style={{ width: "100%" }} size={10}>
          <Row>
            <Col span={12}>
              <Title
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  fontSize: 18,
                }}>
                {"ระบบที่เปิดใช้งาน"}
              </Title>
            </Col>
          </Row>
          <div className="chemds-container">
            <Row style={{ marginBottom: "1%" }}>
              <Col span={16}>
                <Form layout="inline" form={form}>
                  <Col>
                    <Form.Item name="webKey">
                      <Input placeholder="คีย์ระบบ" allowClear />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="name">
                      <Input placeholder="ชื่อ" allowClear />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Button
                      className="chemds-button"
                      type="primary"
                      onClick={() => {
                        onSearch();
                      }}>
                      ค้นหา
                    </Button>
                  </Col>
                </Form>
              </Col>
              <Col
                span={8}
                style={{ display: "flex", justifyContent: "right" }}>
                <Button
                  className="chemds-button"
                  type="primary"
                  onClick={() => {
                    setLoading(true);
                    router.push(`/private/system/new`);
                  }}>
                  เพิ่ม
                </Button>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1%" }}>
              <Col span={24}>
                <Table
                  columns={columns}
                  rowKey={(record) => record.id}
                  dataSource={systems.data}
                  style={{ width: "100%" }}
                  pagination={false}
                  bordered
                  loading={tableLoading}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Pagination
                  defaultCurrent={1}
                  total={systems.totalCount}
                  showSizeChanger={false}
                  pageSize={10}
                  onChange={onPageChange}
                  align="end"
                />
              </Col>
            </Row>
          </div>
        </Space>
      </div>
    </>
  );
}
