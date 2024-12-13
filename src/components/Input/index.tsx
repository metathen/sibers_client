import { Input } from '@nextui-org/react';
import { Control, useController } from 'react-hook-form';

type Props = {
	name: string;
	label?: string;
	placeholder?: string;
	type?: string;
	control: Control<any>;
	required?: string;
}

export const InputProject = ({
	name, label,
	placeholder, type,
	control, required
}: Props) => {
	const {
		field, 					//
		fieldState: {invalid}, 	//
	formState: {errors}			//It is for integrating React Hook Form with the Input component
	} = useController({			//to facilitate more convenient form state management.
		name, control,			//
		rules: {required}		//
	})
	return (
		<Input 
			id={name}
			label={label}
			type={type}
			placeholder={placeholder}
			value={field.value}
			name={field.name}
			isInvalid={invalid}
			onChange={field.onChange}
			onBlur={field.onBlur}
			errorMessage={`${errors[name]?.message ?? ''}`} //save all inputs with error
		/>
	)
}
