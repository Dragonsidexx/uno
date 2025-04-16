import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'black';
export type CardType = 'number' | 'skip' | 'reverse' | 'draw2' | 'wild' | 'wild4';

export interface UnoCardProps {
  color: CardColor;
  value: string | number;
  type: CardType;
  onPress?: () => void;
  isPlayable?: boolean;
}

export default function UnoCard({ color, value, type, onPress, isPlayable = true }: UnoCardProps) {
  const getCardIcon = () => {
    switch (type) {
      case 'skip':
        return 'block-helper';
      case 'reverse':
        return 'swap-horizontal';
      case 'draw2':
        return 'cards';
      case 'wild':
      case 'wild4':
        return 'palette';
      default:
        return null;
    }
  };

  return (
    <Pressable 
      onPress={isPlayable ? onPress : undefined}
      style={[
        styles.card,
        { backgroundColor: color },
        !isPlayable && styles.disabled
      ]}
    >
      <Text style={styles.cornerNumber}>{value}</Text>
      <View style={styles.center}>
        {getCardIcon() ? (
          <MaterialCommunityIcons 
            name={getCardIcon()} 
            size={32} 
            color="white" 
          />
        ) : (
          <Text style={styles.centerNumber}>{value}</Text>
        )}
      </View>
      <Text style={[styles.cornerNumber, styles.bottomNumber]}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    borderRadius: 8,
    padding: 8,
    margin: 4,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'white',
  },
  cornerNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNumber: {
    alignSelf: 'flex-end',
    transform: [{ rotate: '180deg' }],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNumber: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});