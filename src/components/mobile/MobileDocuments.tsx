
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Download, Eye, Calendar } from "lucide-react";

const MobileDocuments = () => {
  const documents = [
    {
      id: 1,
      name: "Project Specifications - Downtown Office",
      type: "PDF",
      size: "2.4 MB",
      project: "Downtown Office Complex",
      uploadedBy: "John Smith",
      uploadedAt: "2024-06-10",
      category: "specifications",
    },
    {
      id: 2,
      name: "Safety Protocol Manual",
      type: "PDF",
      size: "1.8 MB",
      project: "All Projects",
      uploadedBy: "Lisa Chen",
      uploadedAt: "2024-06-08",
      category: "safety",
    },
    {
      id: 3,
      name: "Building Plans - Phase 2",
      type: "DWG",
      size: "5.2 MB",
      project: "Residential Tower Phase 2",
      uploadedBy: "Sarah Wilson",
      uploadedAt: "2024-06-05",
      category: "plans",
    },
    {
      id: 4,
      name: "Material Purchase Order",
      type: "PDF",
      size: "0.5 MB",
      project: "Hospital Extension",
      uploadedBy: "Mike Johnson",
      uploadedAt: "2024-06-03",
      category: "contracts",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "specifications":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "safety":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "plans":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "contracts":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "reports":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "manuals":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-mobile-md pb-20">
      <div className="space-y-4">
        {documents.map((document) => (
          <MobileCard key={document.id} className="touch-manipulation">
            <MobileCardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-mobile-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {document.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-mobile-sm text-gray-600 dark:text-gray-400">
                      {document.type} • {document.size}
                    </span>
                    <Badge className={getCategoryColor(document.category)}>
                      {document.category}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-mobile-xs text-gray-500 dark:text-gray-400">
                    <div>{document.project}</div>
                    <div>Uploaded by {document.uploadedBy}</div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1 min-h-[40px]">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="min-h-[40px]">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-40"
        size="sm"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileDocuments;
