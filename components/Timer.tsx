import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export default function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Timer countdown logic
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  // ✅ Handle time-up separately (safe)
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp]);

  const progress = (timeLeft / duration) * 100;

  const getTimerColor = () => {
    if (timeLeft > 15) return 'bg-green-500';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-700 font-semibold">Time Remaining</Text>
        <Text className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
          {timeLeft}s
        </Text>
      </View>
      <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${getTimerColor()} transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}
