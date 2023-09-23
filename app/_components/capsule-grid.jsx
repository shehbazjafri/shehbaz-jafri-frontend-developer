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

const StatusTag = ({ status }) => {
  const statusColor = {
    active: 'bg-green-500',
    retired: 'bg-yellow-500',
    unknown: 'bg-gray-500',
    destroyed: 'bg-red-500',
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-md ${statusColor[status]}`}
    >
      {status}
    </span>
  );
};

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
              <CardContent className="flex items-start gap-x-1">
                <label className="font-medium">Status:</label>
                <p>
                  <StatusTag status={capsule.status} />
                </p>
              </CardContent>
              <CardContent className="flex flex-col text-left gap-x-1">
                <label className="font-medium whitespace-nowrap">
                  Last Update:
                </label>
                <p>{capsule.last_update || '-'}</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {capsule.serial} {capsule.type}
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-y-4 pt-4">
                <div className="flex gap-x-1">
                  <label className="font-normal">Serial:</label>
                  <p className="text-black font-medium">{capsule.serial}</p>
                </div>
                <div className="flex gap-x-1">
                  <label className="font-normal">Type:</label>
                  <p className="text-black font-medium">{capsule.type}</p>
                </div>
                <div className="flex gap-x-1">
                  <label className="font-normal">Status:</label>
                  <p>
                    <StatusTag status={capsule.status} />
                  </p>
                </div>
                <div className="flex gap-x-1">
                  <label className="font-normal">Reuse Count:</label>
                  <p className="text-black font-medium">
                    {capsule.reuse_count}
                  </p>
                </div>
                <div className="flex gap-x-1">
                  <label className="font-normal">Water Landings:</label>
                  <p className="text-black font-medium">
                    {capsule.water_landings}
                  </p>
                </div>
                <div className="flex gap-x-1">
                  <label className="font-normal">Land Landings:</label>
                  <p className="text-black font-medium">
                    {capsule.land_landings}
                  </p>
                </div>
                <div className="flex gap-x-1">
                  <label className="font-normal">Last Update:</label>
                  <p className="text-black font-medium">
                    {capsule.last_update || '-'}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default CapsuleGrid;
