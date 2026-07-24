import { createContext, useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  NativeSelect,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Pencil } from 'lucide-react';
import { Card, CardDivider, CardHeader } from './Card';
import { DisplayField } from './DisplayField';

type Values = Record<string, string>;

interface EditCtx {
  editing: boolean;
  values: Values;
  setValue: (key: string, value: string) => void;
}

const EditContext = createContext<EditCtx | null>(null);

/**
 * EditableSection — a Card section that toggles between read and edit modes.
 * Header shows an Edit affordance; in edit mode it becomes Cancel / Save.
 * Provides edit state + a values store to any `EditableField` descendant.
 *
 * Cancel restores the values captured when editing began; Save commits them.
 */
export function EditableSection({
  title,
  subtitle,
  initialValues,
  onSave,
  children,
}: {
  title: string;
  subtitle?: string;
  initialValues: Values;
  onSave?: (values: Values) => void;
  children: React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Values>(initialValues);
  const snapshot = useRef<Values>(initialValues);

  const setValue = (key: string, value: string) =>
    setValues(prev => ({ ...prev, [key]: value }));

  const startEdit = () => {
    snapshot.current = values;
    setEditing(true);
  };
  const cancel = () => {
    setValues(snapshot.current);
    setEditing(false);
  };
  const save = () => {
    onSave?.(values);
    setEditing(false);
  };

  return (
    <Card display="flex" flexDir="column" gap="4">
      <CardHeader
        title={title}
        description={subtitle}
        action={
          editing ? (
            <HStack gap="2">
              <Button intent="secondary" size="sm" h="9" onClick={cancel}>
                Cancel
              </Button>
              <Button intent="primary" size="sm" h="9" onClick={save}>
                Save
              </Button>
            </HStack>
          ) : (
            <Button intent="ghost" size="sm" h="9" color="brand.fg" onClick={startEdit}>
              <Pencil size={14} />
              Edit
            </Button>
          )
        }
      />
      <CardDivider />
      <Box>
        <EditContext.Provider value={{ editing, values, setValue }}>
          {children}
        </EditContext.Provider>
      </Box>
    </Card>
  );
}

/** Shared field label styling (matches DisplayField's label). */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="13px" fontWeight={600} color="fg.muted" mb="1.5">
      {children}
    </Text>
  );
}

/**
 * EditableField — renders a read-only DisplayField, or the matching input when
 * its parent EditableSection is in edit mode. Must be used inside an
 * EditableSection.
 */
export function EditableField({
  name,
  label,
  type = 'text',
  options,
  rows,
}: {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
  rows?: number;
}) {
  const ctx = useContext(EditContext);
  if (!ctx) throw new Error('EditableField must be used within an EditableSection');
  const { editing, values, setValue } = ctx;
  const value = values[name] ?? '';

  if (!editing) {
    return <DisplayField label={label} value={value} />;
  }

  return (
    <Box>
      <FieldLabel>{label}</FieldLabel>
      {type === 'textarea' ? (
        <Textarea value={value} onChange={e => setValue(name, e.target.value)} rows={rows ?? 3} />
      ) : type === 'select' ? (
        <NativeSelect.Root>
          <NativeSelect.Field value={value} onChange={e => setValue(name, e.target.value)}>
            {value === '' && <option value="">Select…</option>}
            {(options ?? []).map(o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      ) : (
        <Input value={value} onChange={e => setValue(name, e.target.value)} />
      )}
    </Box>
  );
}
