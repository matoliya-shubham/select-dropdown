import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";

export interface WarningAlertDialogProps {
  title?: string | undefined;
  open: boolean;
  description: ReactNode;
  isActionInProgress?: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onAction: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  secondaryButtonLabel?: string;
  primaryButtonLabel?: string;
  primaryButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  secondaryButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const WarningAlertDialog = ({
  open,
  onOpenChange,
  description,
  onCancel,
  onAction,
  isActionInProgress,
  title,
  secondaryButtonLabel,
  primaryButtonLabel,
  primaryButtonProps,
  secondaryButtonProps,
}: WarningAlertDialogProps) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          // page become in responsive due to pointer events none set on body not being unset during unmount/close
          setTimeout(() => {
            document.body.style.pointerEvents = "auto";
          }, 100);
        }
      }}
    >
      <AlertDialogContent className="p-6 rounded-xl w-[32rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col gap-4 mb-0">
            <span className="text-2xl">{title ?? "Warning"}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-gray-700">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 mt-8">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isActionInProgress}
            {...primaryButtonProps}
          >
            {primaryButtonLabel ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            disabled={isActionInProgress}
            {...secondaryButtonProps}
          >
            {secondaryButtonLabel ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
