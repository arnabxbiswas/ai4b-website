import ToolComponent from "../../../../components/Dynamic/Tool";
import axios from "axios";

export const dynamicParams = true;

interface ToolType {
  title: string;
}

export async function generateStaticParams() {
  try {
    const response = await axios.get("https://admin.models.ai4bharat.org/tools/");

    const tools = response.data;

    let params: any[] = [];

    if (Array.isArray(tools)) {
      tools.forEach((tool: ToolType) => {
        params.push({
          tool: tool.title,
        });
      });
    }

    if (params.length === 0) {
      return [{ tool: 'fallback' }];
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ tool: 'fallback' }];
  }
}

export default function Tool({ params }: { params: { tool: string } }) {
  return <ToolComponent slug={params.tool} />;
}
