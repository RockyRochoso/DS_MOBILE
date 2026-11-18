import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function lerInteiro(texto) {
  const t = texto.trim();
  if (t === '') return { erro: 'Preencha o campo.' };
  const n = Number(t);
  if (isNaN(n) || !Number.isInteger(n)) return { erro: 'Use apenas números inteiros.' };
  if (n < 0) return { erro: 'Não use valores negativos.' };
  return { valor: n };
}

export default function App() {
  const [produto, setProduto] = useState('');
  const [inicial, setInicial] = useState('');
  const [movimento, setMovimento] = useState('');
  const [estoque, setEstoque] = useState(null);
  const [nomeAtivo, setNomeAtivo] = useState('');
  const [mensagem, setMensagem] = useState('');

  function iniciar() {
    if (produto.trim() === '') {
      setMensagem('Informe o nome do produto.');
      return;
    }
    const r = lerInteiro(inicial);
    if (r.erro) {
      setMensagem('Quantidade inicial: ' + r.erro);
      return;
    }
    setNomeAtivo(produto.trim());
    setEstoque(r.valor);
    setMensagem('');
  }

  function adicionar() {
    const r = lerInteiro(movimento);
    if (r.erro) return setMensagem('Movimentação: ' + r.erro);
    if (r.valor === 0) return setMensagem('A movimentação deve ser maior que zero.');
    setEstoque(estoque + r.valor);
    setMovimento('');
    setMensagem('');
  }

  function retirar() {
    const r = lerInteiro(movimento);
    if (r.erro) return setMensagem('Movimentação: ' + r.erro);
    if (r.valor === 0) return setMensagem('A movimentação deve ser maior que zero.');
    if (r.valor > estoque) {
      return setMensagem(`Retirada inválida: só há ${estoque} unidade(s) disponível(is).`);
    }
    setEstoque(estoque - r.valor);
    setMovimento('');
    setMensagem('');
  }

  function reiniciar() {
    setEstoque(null);
    setNomeAtivo('');
    setProduto('');
    setInicial('');
    setMovimento('');
    setMensagem('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar style="dark" />
      <Text style={styles.titulo}>📦 Controle de Estoque</Text>

      {estoque === null ? (
        <View>
          <Text style={styles.label}>Nome do produto</Text>
          <TextInput style={styles.input} placeholder="Ex.: Caneta azul" value={produto} onChangeText={setProduto} />

          <Text style={styles.label}>Quantidade inicial</Text>
          <TextInput style={styles.input} placeholder="Ex.: 20" keyboardType="numeric" value={inicial} onChangeText={setInicial} />

          <Pressable style={[styles.botao, { backgroundColor: '#1f618d' }]} onPress={iniciar}>
            <Text style={styles.botaoTexto}>Iniciar controle</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardProduto}>{nomeAtivo}</Text>
            <Text style={styles.cardQtd}>{estoque} unidade(s)</Text>
          </View>

          {estoque < 5 && (
            <View style={styles.alerta}>
              <Text style={styles.alertaTexto}>
                ⚠️ Atenção: restam menos de 5 unidades! ({estoque})
              </Text>
            </View>
          )}

          <Text style={styles.label}>Movimentação (unidades)</Text>
          <TextInput style={styles.input} placeholder="Ex.: 7" keyboardType="numeric" value={movimento} onChangeText={setMovimento} />

          <View style={styles.linha}>
            <Pressable style={[styles.botao, styles.metade, { backgroundColor: '#1e8449' }]} onPress={adicionar}>
              <Text style={styles.botaoTexto}>Adicionar estoque</Text>
            </Pressable>
            <Pressable style={[styles.botao, styles.metade, { backgroundColor: '#b03a2e' }]} onPress={retirar}>
              <Text style={styles.botaoTexto}>Retirar estoque</Text>
            </Pressable>
          </View>

          <Pressable style={[styles.botao, { backgroundColor: '#7f8c8d' }]} onPress={reiniciar}>
            <Text style={styles.botaoTexto}>Trocar produto</Text>
          </Pressable>
        </View>
      )}

      {mensagem !== '' && <Text style={styles.erro}>{mensagem}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f6f8fa', padding: 24, paddingTop: 70, flexGrow: 1 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#1b2631', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4, marginTop: 12, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c5cdd3',
    borderRadius: 8,
    padding: 12,
    fontSize: 17,
  },
  botao: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  linha: { flexDirection: 'row', gap: 10 },
  metade: { flex: 1 },
  card: { backgroundColor: '#d6eaf8', padding: 20, borderRadius: 10, alignItems: 'center' },
  cardProduto: { fontSize: 20, fontWeight: 'bold' },
  cardQtd: { fontSize: 32, fontWeight: 'bold', color: '#1f618d', marginTop: 6 },
  alerta: { backgroundColor: '#fdebd0', borderColor: '#e67e22', borderWidth: 1, padding: 12, borderRadius: 8, marginTop: 14 },
  alertaTexto: { color: '#a04000', fontWeight: 'bold', textAlign: 'center' },
  erro: { color: '#c0392b', marginTop: 16, fontSize: 16, textAlign: 'center' },
});
