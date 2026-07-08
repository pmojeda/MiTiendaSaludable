import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={open} as="div" className="relative z-50" onClose={onCancel}>
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Contenedor */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {title}
          </DialogTitle>

          <p className="mt-3 text-gray-600">{message}</p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
