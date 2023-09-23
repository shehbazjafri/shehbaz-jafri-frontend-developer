import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';

const CapsuleGrid = ({ capsules, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
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
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 2xl:grid-cols-6">
      {capsules.map((capsule) => (
        <Dialog key={capsule.id}>
          <DialogTrigger>
            <Card
              key={capsule.id}
              className="shadow-md rounded-xl overflow-hidden min-h-[18rem]"
            >
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
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {capsule.serial} {capsule.type}
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-y-4 pt-4">
                <p>Serial: {capsule.serial}</p>
                <p>Type: {capsule.type}</p>
                <p>Status: {capsule.status}</p>
                <p>Reuse Count: {capsule.reuse_count}</p>
                <p>Water Landings: {capsule.water_landings}</p>
                <p>Land Landings: {capsule.land_landings}</p>
                <p>Last Update: {capsule.last_update || '-'}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default CapsuleGrid;
