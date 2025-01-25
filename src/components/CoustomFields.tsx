import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Colors } from '../constant/Colors';
import { FC } from 'react';
import { InputTypes } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

const ValideationFiled: FC<InputTypes> = ({
  fieldName,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={values?.[fieldName]} 
        onChangeText={handleChange} 
        onBlur={handleBlur(fieldName)} 
        placeholder={`Enter Your ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`} 
        keyboardType={fieldName === "email" ? "email-address" : "default"}
        secureTextEntry={fieldName === "password" || fieldName === "confirmPassword"}  
        style={styles.input}
      />

      {errors?.[fieldName] && touched?.[fieldName] && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={15} color={Colors.danger} />
          <Text style={styles.errorText}>{errors?.[fieldName]}</Text>
        </View>
      )}
    </View>
  );
};

export default ValideationFiled;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.textary,
    borderRadius: 5,
    marginBottom: 5,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 3,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
  }
});
