export async function generateStaticParams() {
  let params: any[] = [{ title: "indicvoices" }];

  return params;
}

export default function Standalone({ params }: { params: { title: string } }) {
  if (params.title.includes("indicvoices")) {
    return (
      <iframe
        src={"https://indicvoices.ai4bharat.org/"}
        title={`${params.title}`}
        width="100%"
        height={1200}
      />
    );
  } else {
    return <></>;
  }
}
