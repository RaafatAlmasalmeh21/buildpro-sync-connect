
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProjectsGantt = () => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Gantt Chart View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Gantt Chart Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive timeline and scheduling visualization will be available in the next update.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
