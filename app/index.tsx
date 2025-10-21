import { QUESTIONS } from '@/contstants/questions';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
 

const HomeScreen = () => {
const router = useRouter();

const startQuiz = () => {
  router.push('/quiz');
}

  return (
    <View className='flex-1 bg-gradient-to-b from-blue-50 to-indigo- justify-center items-center px-6'>
 <View className='bg-white rounded-3xl p-8 shadow-2xl shadow-blue-200 w-full max-w-sm'>

<Text className='text-lg text-center text-gray-600 mb-8'>
Test your technology knowledge!
</Text>
<View className='bg-blue-50 rounded-2xl p-6 mb-8'>
<Text className='text-center text-gray-700 font-semibold mb-4'>
Quiz Details:
</Text>
 <View className="space-y-2">
            <Text className="text-center text-gray-600">📚 {QUESTIONS.length} Questions</Text>
            <Text className="text-center text-gray-600">⏱️ 30s per question</Text>
            <Text className="text-center text-gray-600">🎯 Multiple Choice</Text>
          </View>
</View>
<TouchableOpacity onPress={startQuiz} className='bg-blue-500 rounded-2xl py-4 px-6 shadow-lg shadow-blue-200 active:scale-95 transition-all'>
<Text className='text-white text-center text-lg font-semibold'>
Start Quiz
</Text>
</TouchableOpacity>

<Text className='text-center text-gray-500 text-sm mt-6'>
 Challenge yourself with technology questions!
</Text>
 </View>
    </View>
  )
}

export default HomeScreen
