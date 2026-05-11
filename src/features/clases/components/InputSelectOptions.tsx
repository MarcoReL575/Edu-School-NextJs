// import React, { useId } from 'react'
// import Select from 'react-select';

// export default function InputSelectOptions() {

//     const customInstanceId = useId();

//       const optionsDays = [
//         { value: 'lunes', label: 'Lunes' },
//         { value: 'martes', label: 'Martes' },
//         { value: 'miercoles', label: 'Miércoles' },
//         { value: 'jueves', label: 'Jueves' },
//         { value: 'viernes', label: 'Viernes' },
//         { value: 'sabado', label: 'Sábado' },
//         { value: 'domingo', label: 'Domingo' },
//       ];

//   return (
//     <div>
//         <FormLabel htmlFor="day">¿Qúe días se dará la materia?</FormLabel>
//         <Controller 
//             name="day"
//             control={control}
//             render={({ field }) => (
//                 <Select 
//                 {...field} 
//                 id="day"
//                 instanceId={customInstanceId}
//                 isMulti
//                 options={optionsDays}
//                 className="border p-2 rounded-lg"
//                 value={optionsDays.filter((option) => (field.value || []).includes(option.value))}
//                 onChange={(val) => field.onChange(val ? val.map((c) => c.value) : [])}
//                 />
//             )}
//         />
        
//     </div>
//   )
// }
