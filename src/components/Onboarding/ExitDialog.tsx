import { Button, Dialog, Portal } from '@chakra-ui/react';

interface ExitDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExitDialog({ open, onClose, onConfirm }: ExitDialogProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => { if (!e.open) onClose(); }}
      placement="center"
      motionPreset="scale"
    >
      <Portal>
        <Dialog.Backdrop bg="bg.scrim" />
        <Dialog.Positioner>
          <Dialog.Content rounded="lg" maxW="420px" p="6" bg="bg" shadow="modal">
            <Dialog.Header pb="2" px="0" pt="0">
              <Dialog.Title fontSize="18px" fontWeight={600} color="fg">
                Finish later?
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px="0" pb="6" pt="0">
              <Dialog.Description fontSize="14px" color="fg.muted" lineHeight="1.5">
                Your progress is saved automatically. You can pick up right where you left off any time from your dashboard.
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer p="0" gap="2" justifyContent="flex-end">
              <Button intent="ghost" onClick={onClose}>
                Keep going
              </Button>
              <Button intent="primary" onClick={onConfirm}>
                Finish later
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
