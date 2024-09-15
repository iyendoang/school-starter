import Button from "@/Components/Button";
import { IconArrowBigLeftLinesFilled, IconPencil } from "@tabler/icons-react";

export default function ButtonAction({ linkBack, labelBack, onSubmit, onProcessing = false }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          {/* Conditionally render the back button if linkBack is provided */}
          {linkBack && (
            <Button
              type="link"
              href={linkBack}
              label={labelBack}
              icon={<IconArrowBigLeftLinesFilled size={20} strokeWidth={1.5} />}
              variant="gray"
            />
          )}
        </div>
        <div>
          {/* Submit button */}
          <Button
            type="button" // Handle form submission manually
            label="Simpan"
            icon={<IconPencil size={20} strokeWidth={1.5} />}
            className="bg-indigo-500 dark:bg-indigo-600"
            onClick={onSubmit}
            disabled={onProcessing}
          />
        </div>
      </div>
    </div>
  );
}
