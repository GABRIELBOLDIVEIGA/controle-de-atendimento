import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center pt-10">
      <div className="w-10/12">
        <Card className=" dark:bg-bg bg-background">
          <CardHeader>
            <CardTitle>Pagina não encontrada</CardTitle>
            <CardDescription
              className="cursor-pointer hover:underline"
              onClick={() => navigate(-1)}
            >
              Voltar
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};
