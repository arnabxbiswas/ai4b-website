import { datasets } from "../config";

export async function generateStaticParams() {
  let params: any[] = datasets;

  return params;
}

export default function Dataset({ params }: { params: { title: string } }) {
  if (params.title.includes("rasa")) {
    return (
      <iframe
        src={"https://rasa.ai4bharat.org/"}
        title={`${params.title}`}
        width="100%"
        height={2000}
      />
    );
  } else if (params.title.includes("indicvoices")) {
    return (
      <iframe
        src={"https://indicvoices.ai4bharat.org/"}
        title={`${params.title}`}
        width="100%"
        height={2000}
      />
    );
  } else {
    return (
      <iframe
        src={`https://datasets.ai4bharat.org/${params.title}`}
        title={`${params.title}`}
        width="100%"
        height={2000}
      />
    );
  }
}
