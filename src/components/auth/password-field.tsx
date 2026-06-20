import { Input, PressableFeedback, Typography, TextField } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";

type PasswordFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  isInvalid?: boolean;
};

export function PasswordField({
  label,
  placeholder = "Password",
  value,
  onChangeText,
  isInvalid,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField isInvalid={isInvalid}>
      <Typography type="body-sm" color="muted" className="mb-1">
        {label}
      </Typography>
      <View className="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          autoCapitalize="none"
          className="pr-12"
        />
        <PressableFeedback
          accessibilityRole="button"
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-1"
          onPress={() => {
            setVisible((current) => !current);
          }}
        >
          <Typography type="body-sm" className="text-muted">
            {visible ? "Hide" : "Show"}
          </Typography>
        </PressableFeedback>
      </View>
    </TextField>
  );
}
