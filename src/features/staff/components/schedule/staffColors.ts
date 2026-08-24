export const getStaffColor = (staffId: string) => {
    const colors: Record<
      string,
      {
        dot: string;
        background: string;
        border: string;
        text: string;
      }
    > = {
      "staff-1": {
        dot: "bg-orange-500",
        background: "bg-orange-50",
        border: "border-orange-300",
        text: "text-orange-900",
      },
  
      "staff-2": {
        dot: "bg-blue-500",
        background: "bg-blue-50",
        border: "border-blue-300",
        text: "text-blue-900",
      },
  
      "staff-3": {
        dot: "bg-emerald-500",
        background: "bg-emerald-50",
        border: "border-emerald-300",
        text: "text-emerald-900",
      },
  
      "staff-4": {
        dot: "bg-violet-500",
        background: "bg-violet-50",
        border: "border-violet-300",
        text: "text-violet-900",
      },
    };
  
    return (
      colors[staffId] ?? {
        dot: "bg-gray-400",
        background: "bg-gray-50",
        border: "border-gray-300",
        text: "text-gray-900",
      }
    );
  };
  