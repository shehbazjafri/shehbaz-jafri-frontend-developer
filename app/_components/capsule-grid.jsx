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

const fieldsToDisplay = [
  { label: 'Serial', key: 'serial' },
  { label: 'Type', key: 'type' },
  { label: 'Status', key: 'status' },
  { label: 'Reuse Count', key: 'reuse_count' },
  { label: 'Water Landings', key: 'water_landings' },
  { label: 'Land Landings', key: 'land_landings' },
  { label: 'Last Update', key: 'last_update' },
];

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
    const numLoadingElements = 6; // Define the number of loading elements you want
    const loadingElements = Array.from(
      { length: numLoadingElements },
      (_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 rounded-md h-36 w-full"
        ></div>
      )
    );

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {loadingElements}
      </div>
    );
  }

  if (!capsules.length) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold text-textGrey">
          No Capsules Found
        </p>
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
                {fieldsToDisplay.map((fieldInfo) => (
                  <div key={fieldInfo.key} className="flex gap-x-1">
                    <label className="font-normal">{fieldInfo.label}:</label>
                    {fieldInfo.key === 'status' ? (
                      <p>
                        <StatusTag status={capsule[fieldInfo.key]} />
                      </p>
                    ) : (
                      <p className="text-black font-medium">
                        {capsule[fieldInfo.key]}
                      </p>
                    )}
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default CapsuleGrid;
