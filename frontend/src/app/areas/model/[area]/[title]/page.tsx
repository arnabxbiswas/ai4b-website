import ModelView from "../../../../../../components/Models";

export const dynamicParams = true;

interface Model {
  area: string;
  title: string;
}

import axios from "axios";

export async function generateStaticParams() {
  try {
    const response = await axios.get(
      "https://admin.models.ai4bharat.org/models/"
    );
    const models = response.data;

    let params: any[] = [];

    if (Array.isArray(models)) {
      models.forEach((model: Model) => {
        params.push({
          area: model.area,
          title: model.title,
        });
      });
    }

    if (params.length === 0) {
      return [{ area: 'fallback', title: 'fallback' }];
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ area: 'fallback', title: 'fallback' }];
  }
}

export default function Model({
  params,
}: {
  params: { area: string; title: string };
}) {
  return (
    <>
      <ModelView area={params.area} title={params.title} />
    </>
  );
}
