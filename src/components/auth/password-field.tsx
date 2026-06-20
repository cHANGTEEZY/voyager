import EyeIcon from "@hugeicons/core-free-icons/EyeIcon";
import ViewOffIcon from "@hugeicons/core-free-icons/ViewOffIcon";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Input, PressableFeedback, TextField, Typography } from "heroui-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useCSSVariable } from "uniwind";

type PasswordFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

export function PasswordField({
  label,
  placeholder = "Password",
  value,
  onChangeText,
  onBlur,
  isInvalid,
  errorMessage,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const mutedColor = useCSSVariable("--muted");
  const iconColor = typeof mutedColor === "string" ? mutedColor : "#8a8580";

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
          onBlur={onBlur}
          secureTextEntry={!visible}
          autoCapitalize="none"
          className="pr-12"
        />
        <PressableFeedback
          accessibilityRole="button"
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          style={styles.toggle}
          onPress={() => {
            setVisible((current) => !current);
          }}
        >
          <HugeiconsIcon
            icon={visible ? ViewOffIcon : EyeIcon}
            size={20}
            color={iconColor}
            strokeWidth={1.5}
          />
        </PressableFeedback>
      </View>
      {isInvalid && errorMessage ? (
        <Typography type="body-sm" className="mt-1 text-danger">
          {errorMessage}
        </Typography>
      ) : null}
    </TextField>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
