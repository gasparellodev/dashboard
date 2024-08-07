import axios from "axios";
import { Product } from "./types";

interface ProductsResponse {
  isOk: boolean;
  data?: Product[];
}

export const PaginateProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product/paginate`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@NativePay:Token")}`,
        },
      },
    );

    if (response.status >= 200 && response.status < 400) {
      return { isOk: true, data: response.data.data };
    } else {
      return { isOk: false, data: response.data.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { isOk: false, data: error.response?.data || error.message };
    }
    return { isOk: false };
  }
};
