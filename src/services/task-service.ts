import axios, { AxiosResponse } from "axios";
import useSWR from "swr";
import { PageResponse, Task } from "../types";

const API_URL = process.env.REACT_APP_API_URL + "/tasks";

type CreateTaskInput = Omit<Task, "taskId" | "user">;

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetcher = (url: string) =>
  axiosInstance.get(url).then((response: AxiosResponse) => response.data);

const useTasks = (filterParams?: {
  name?: string;
  priority?: string;
  state?: string;
  sortBy?: string;
  direction?: string;
  pageable?: { pageNumber: number; pageSize: number };
}) => {
  let url = `${API_URL}`;

  const queryParams = new URLSearchParams();

  if (filterParams?.name) queryParams.append("name", filterParams.name);
  if (filterParams?.priority && filterParams.priority !== "all")
    queryParams.append("priority", filterParams.priority);
  if (filterParams?.state && filterParams.state !== "all")
    queryParams.append("state", filterParams.state);
  if (filterParams?.sortBy) queryParams.append("sortBy", filterParams.sortBy);
  if (filterParams?.direction)
    queryParams.append("direction", filterParams.direction);
  if (filterParams?.pageable) {
    queryParams.append("page", filterParams.pageable.pageNumber.toString());
    queryParams.append("size", filterParams.pageable.pageSize.toString());
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  const { data, error, mutate } = useSWR<PageResponse<Task>>(url, fetcher);

  return {
    tasks: data?.content || [],
    pagination: {
      pageNumber: data?.pageable.pageNumber || 0,
      pageSize: data?.pageable.pageSize || 20,
      totalElements: data?.totalElements || 0,
      totalPages: data?.totalPages || 1,
      isFirstPage: data?.first || true,
      isLastPage: data?.last || false,
    },
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

const createTask = async (task: CreateTaskInput): Promise<Task> => {
  const response = await axiosInstance.post<Task>("", task);

  return response.data;
};

const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.put<Task>(`/${id}`, task);

  return response.data;
};

const deleteTask = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};

const taskService = {
  useTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
