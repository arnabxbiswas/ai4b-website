import { datasets } from "../config";
import Moving from "../../../../components/Moving";

export async function generateStaticParams() {
  let params: any[] = datasets;

  return params;
}

export default function Dataset({ params }: { params: { title: string } }) {
  return <Moving />;
}
