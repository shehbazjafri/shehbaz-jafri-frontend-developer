import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';

const CapsuleGrid = ({ capsules, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-4 2xl:grid-cols-6">
        <div className="animate-pulse bg-gray-200 rounded-md h-36 w-full"></div>
        <div className="animate-pulse bg-gray-200 rounded-md h-36 w-full"></div>
        <div className="animate-pulse bg-gray-200 rounded-md h-36 w-full"></div>
        <div className="animate-pulse bg-gray-200 rounded-md h-36 w-full"></div>
        <div className="animate-pulse bg-gray-200 rounded-md h-36 w-full"></div>
        <div className="animate-pulse bg-gray-200 rounded-md h-36 w-full"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-4 2xl:grid-cols-6">
      {capsules.map((capsule) => (
        <Card key={capsule.id} className="shadow-md rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-start">
              {capsule.serial} {capsule.type}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start">
            Status: {capsule.status}
          </CardContent>
          <CardContent className="flex flex-col items-start text-left">
            Last Update: {capsule.last_update || '-'}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CapsuleGrid;
