import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [idade, setIdade] = useState('');
  const [plano, setPlano] = useState('Básico');
  const [mesesAtivo, setMesesAtivo] = useState('');
  const [carencia, setCarencia] = useState(false);
  const [doencasCronicas, setDoencasCronicas] = useState(false);
  const [dependentes, setDependentes] = useState('');
  const [consultasRecentes, setConsultasRecentes] = useState(false);
  const [faturasAtraso, setFaturasAtraso] = useState(false);
  const [estado, setEstado] = useState('');

  const estadosAtendidos = ['São Paulo', 'Minas Gerais', 'Paraná'];

  function verificarBeneficio() {
    const idadeNum = parseInt(idade);
    const mesesNum = parseInt(mesesAtivo);
    const dependentesNum = parseInt(dependentes);

    if (isNaN(idadeNum) || idadeNum < 18 || idadeNum > 65) {
      return Alert.alert('Desculpe', 'Você não está na faixa etária permitida.');
    }

    if (
      plano !== 'Premium' &&
      !(plano === 'Essencial' && mesesNum >= 12)
    ) {
      return Alert.alert('Desculpe', 'Seu plano não é elegível.');
    }

    if (!carencia) {
      return Alert.alert('Desculpe', 'Ainda não concluiu o período de carência.');
    }

    if (doencasCronicas) {
      return Alert.alert('Desculpe', 'Possui doenças crônicas cadastradas.');
    }

    if (isNaN(dependentesNum) || dependentesNum > 3) {
      return Alert.alert('Desculpe', 'Quantidade de dependentes excede o limite.');
    }

    if (!consultasRecentes) {
      return Alert.alert('Desculpe', 'Você não teve consultas liberadas nos últimos 6 meses.');
    }

    if (faturasAtraso) {
      return Alert.alert('Desculpe', 'Existem faturas em atraso.');
    }

    if (!estadosAtendidos.includes(estado)) {
      return Alert.alert('Desculpe', 'Seu estado não está na área de cobertura.');
    }

    return Alert.alert('Parabéns', 'Você está qualificado para o benefício extra do seu Plano de Saúde!');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verifique seu Benefício Extra</Text>

      <Text>Idade:</Text>
      <TextInput
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
        style={styles.input}
      />

      <Text>Tipo de Plano:</Text>
      <Picker selectedValue={plano} onValueChange={(itemValue) => setPlano(itemValue)}>
        <Picker.Item label="Básico" value="Básico" />
        <Picker.Item label="Essencial" value="Essencial" />
        <Picker.Item label="Premium" value="Premium" />
      </Picker>

      <Text>Meses com o plano ativo:</Text>
      <TextInput
        keyboardType="numeric"
        value={mesesAtivo}
        onChangeText={setMesesAtivo}
        style={styles.input}
      />

      <Text>Já passou pela carência?</Text>
      <Switch value={carencia} onValueChange={setCarencia} />

      <Text>Possui doenças crônicas?</Text>
      <Switch value={doencasCronicas} onValueChange={setDoencasCronicas} />

      <Text>Quantidade de dependentes:</Text>
      <TextInput
        keyboardType="numeric"
        value={dependentes}
        onChangeText={setDependentes}
        style={styles.input}
      />

      <Text>Teve consultas liberadas nos últimos 6 meses?</Text>
      <Switch value={consultasRecentes} onValueChange={setConsultasRecentes} />

      <Text>Possui faturas em atraso?</Text>
      <Switch value={faturasAtraso} onValueChange={setFaturasAtraso} />

      <Text>Estado onde mora:</Text>
      <TextInput
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
      />

      <Button title="Verificar Benefício" onPress={verificarBeneficio} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', // <-- AQUI ESTÁ O FUNDO BRANCO
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default App;
