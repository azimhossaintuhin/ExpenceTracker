import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions}from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { CardProps } from '../types'


const { width } = Dimensions.get("window")

const Card: FC<CardProps> = ({ item, index }) => {
  // More nuanced color selection with softer palette
  const getCardColor = () => {
    const colors = [
      'rgba(86, 125, 228, 0.9)',   // Soft blue
      'rgba(108, 99, 255, 0.9)',   // Soft purple
      'rgba(255, 114, 94, 0.9)'    // Soft coral
    ]
    return colors[index % colors.length]
  }

  return (
    <Animated.View entering={FadeInDown.springify().delay(index * 100)}>
      <Animated.View 
        style={[
          styles.card, 
          { 
            backgroundColor: getCardColor(),
            transform: [{ scale: 0.95 }] 
          }
        ]}
      >
        <View style={styles.contentContainer}>
          <Text  style={styles.cardTitle}>{item?.title}</Text>
          <Text style={styles.cardNumber}>{item?.count}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <MaterialIcons 
            name={item.icon}
            size={50} 
            color="rgba(255,255,255,0.7)" 
          />
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: width * 0.35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    borderRadius: 16,
    paddingHorizontal: 24,
  },
  contentContainer: {
    justifyContent: 'center'
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  cardNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.9
  },
  iconContainer: {
    opacity: 0.7
  }
})

export default Card
