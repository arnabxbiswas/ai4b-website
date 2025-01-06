import axios from "axios";
import ArticleComponent from "../../../../components/Dynamic/Article";

export const dynamicParams = true;

interface NewsType {
  id: string;
}

export async function generateStaticParams() {
  const response = await axios.get("https://admin.models.ai4bharat.org/news/");

  const news = response.data;

  let params: any[] = [];

  news.forEach((article: NewsType) => {
    params.push({
      article: article.id.toString(),
    });
  });

  params.push({
    article: "indicvoices",
  });

  return params;
}

const blogIdMap = {
  indicvoices: 8,
};

export default function News({ params }: { params: { article: string } }) {
  if (params.article.includes("indicvoices")) {
    return <ArticleComponent slug={"8"} />;
  } else {
    return <ArticleComponent slug={params.article} />;
  }
}
