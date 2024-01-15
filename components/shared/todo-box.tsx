import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const TodoBox = ({todo}: {todo: any}) => {
    return (
        <Card className="mt-5 w-[350px] sm:w-[400px] lg:w-[600px]">
            <CardHeader>
                <CardTitle>{todo.task}</CardTitle>
            </CardHeader>
        </Card>
    );
}

export default TodoBox;