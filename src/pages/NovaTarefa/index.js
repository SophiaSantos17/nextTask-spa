import React, { useState } from "react";
import Header from "../../components/header";
import { StyleSheet, Text, View } from "react-native";
import InputTarefa from "../../components/inputs/inputTarefa";
import InputDate from "../../components/inputs/inputData";
import InputPriority from "../../components/inputs/inputPriority";
import OptionType from "../../components/inputs/optionType";
import Button from "../../components/button";
import { Controller, useForm } from "react-hook-form";

export default function NovaTarefa(){
  const [selectedItem, setSelectedItem] = useState(null);

  const {control, handleSubmit, formState: {errors}} = useForm();

  function onSubmit(data){
    console.log("Dados do Formulário", data);
  }

  const options = [
    { label: "Pessoal", value: "Pessoal" },
    { label: "Comercial", value: "Comercial" },
    { label: "Lazer", value: "Lazer" },
    { label: "Saúde", value: "Saúde" },
    { label: "Casa", value: "Casa" },
    { label: "Outro", value: "Outro" },
  ];

  const handleSelect = (selectedValue) => {
    // Lógica para lidar com a seleção da opção
    console.log("Opção selecionada:", selectedValue);
  };

  return(
    <View style={styles.containerCreate}>
      <Header text="Criar nova tarefa"/>

      <View style={styles.boxInputs}>

        <Controller
          control={control}
          name="titulo"
          render={({field: {onChange, value}}) => (
            <InputTarefa placeholder="Titulo" height={70} align="center" onChangeText={(text) => onChange(text)}/>
          )}
        />
        
        <Controller
          control={control}
          name="data"
          defaultValue={new Date()}
          render={({field: {onChange, value}}) => (
            <InputDate  onChangeText={onChange}/>
          )}
        />

        <View>
          <Text style={styles.textPriority}>Prioridade:</Text>
          <View style={styles.boxPriority}>

            <Controller
              control={control}
              name="prioridade"
              render={({field: {onChange, value}}) => (
                <InputPriority
                  label="Alta"
                  value="Alta"
                  onSelect={() => {
                    onChange("Alta"); // Atualiza o valor do campo de formulário usando o react-hook-form
                    setSelectedItem("Alta"); // Atualiza o estado do seu componente
                  }}
                  selected={selectedItem === "Alta"}
                  priority="Alta"
                />
              )}
            />
            <Controller
              control={control}
              name="prioridade"
              render={({field: {onChange, value}}) => (
                <InputPriority
                  label="Média"
                  value="Media"
                  onSelect={() => {
                    onChange("Media"); // Atualiza o valor do campo de formulário usando o react-hook-form
                    setSelectedItem("Media"); // Atualiza o estado do seu componente
                  }}
                  selected={selectedItem === "Media"}
                  priority="Media"
                />
              )}
            />
            <Controller
              control={control}
              name="prioridade"
              render={({field: {onChange, value}}) => (
                <InputPriority
                  label="Baixa"
                  value="Baixa"
                  onSelect={() => {
                    onChange("Baixa"); // Atualiza o valor do campo de formulário usando o react-hook-form
                    setSelectedItem("Baixa"); // Atualiza o estado do seu componente
                  }}
                  selected={selectedItem === "Baixa"}
                  priority="Baixa"
                />
              )}
            />
          </View>
        </View>

        
        <Controller
          control={control}
          name="selectedOption"
          defaultValue="Pessoal" // valor padrão, se necessário
          render={({ field: { onChange, value } }) => (
            <OptionType
              options={options}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="descricao"
          render={({field: {onChange, value}}) => (
            <InputTarefa placeholder="Descrição" height={150} align="top" onChangeText={(text) => onChange(text)}/>
          )}
        />

        

        <Button title="Criar" width={340} onPress={handleSubmit(onSubmit)}/>
      </View>
    </View>

  )

}


const styles = StyleSheet.create({
  containerCreate: {
    backgroundColor: "#fff",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  boxInputs:{
    height: "75%",
    justifyContent: "space-between",
    alignItems: "center",

  },
  boxPriority: {
    flexDirection: "row",
    // paddingVertical: 10,
  },
  textPriority:{
    textAlign: "left",
    fontSize: 24,
    color:"#0CB7F2",
    fontWeight: "500",
    width: "100%",
    alignItems: "flex-start",
  },    
})