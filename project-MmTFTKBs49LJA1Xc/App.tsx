import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { tokens } from './src/styles/tokens';

type Intent = 'Work' | 'Message' | 'Relax' | 'Urgent' | null;

export default function App() {
  const [selectedIntent, setSelectedIntent] = useState<Intent>(null);
  const [statusText, setStatusText] = useState('Phone aligned to your intent');
  const [showViolation, setShowViolation] = useState(false);
  
  const glyphOpacity = useRef(new Animated.Value(1)).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const lastIntentTime = useRef<number | null>(null);
  const currentAnimation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const stopCurrentAnimation = () => {
    if (currentAnimation.current) {
      currentAnimation.current.stop();
      currentAnimation.current = null;
    }
  };

  const startSteadyGlyph = () => {
    stopCurrentAnimation();
    glyphOpacity.setValue(1);
  };

  const startPulseGlyph = () => {
    stopCurrentAnimation();
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(glyphOpacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glyphOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    currentAnimation.current = anim;
    anim.start();
  };

  const startBreathingGlyph = () => {
    stopCurrentAnimation();
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(glyphOpacity, {
          toValue: 0.2,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glyphOpacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    currentAnimation.current = anim;
    anim.start();
  };

  const startRapidBlink = () => {
    stopCurrentAnimation();
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(glyphOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(glyphOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ])
    );
    currentAnimation.current = anim;
    anim.start();
    
    setTimeout(() => {
      stopCurrentAnimation();
      glyphOpacity.setValue(1);
    }, 3000);
  };

  const flashGlyph = () => {
    Animated.sequence([
      Animated.timing(glyphOpacity, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(glyphOpacity, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(glyphOpacity, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(glyphOpacity, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleIntentSelection = (intent: Intent) => {
    setSelectedIntent(intent);
    lastIntentTime.current = Date.now();

    switch (intent) {
      case 'Work':
        setStatusText('Focus mode active');
        startSteadyGlyph();
        break;
      case 'Message':
        setStatusText('Messages ready');
        startPulseGlyph();
        break;
      case 'Relax':
        setStatusText('Relax mode active');
        startBreathingGlyph();
        break;
      case 'Urgent':
        setStatusText('All restrictions disabled');
        startRapidBlink();
        break;
    }
  };

  useEffect(() => {
    if (selectedIntent === 'Work' && lastIntentTime.current) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - (lastIntentTime.current || 0);
        if (elapsed < 10000) {
          if (elapsed > 6000 && elapsed < 6500 && !showViolation) {
            setShowViolation(true);
            flashGlyph();
            setTimeout(() => setShowViolation(false), 3000);
          }
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [selectedIntent, showViolation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInOpacity }]}>
      <Animated.View style={[styles.glyph, { opacity: glyphOpacity }]} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>What's your intention?</Text>

        <View style={styles.buttonContainer}>
          <IntentButton
            label="Work"
            onPress={() => handleIntentSelection('Work')}
            isSelected={selectedIntent === 'Work'}
          />
          <IntentButton
            label="Message"
            onPress={() => handleIntentSelection('Message')}
            isSelected={selectedIntent === 'Message'}
          />
          <IntentButton
            label="Relax"
            onPress={() => handleIntentSelection('Relax')}
            isSelected={selectedIntent === 'Relax'}
          />
          <IntentButton
            label="Urgent"
            onPress={() => handleIntentSelection('Urgent')}
            isSelected={selectedIntent === 'Urgent'}
          />
        </View>

        <Text style={styles.statusText} numberOfLines={1}>{statusText}</Text>
      </View>

      {showViolation && (
        <View style={styles.violationOverlay}>
          <Text style={styles.violationText} numberOfLines={1}>Stay intentional</Text>
        </View>
      )}
    </Animated.View>
  );
}

function IntentButton({ label, onPress, isSelected }: { label: string; onPress: () => void; isSelected: boolean }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.6,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[styles.button, isSelected && styles.buttonSelected, { opacity: fadeAnim }]}>
        <Text style={[styles.buttonText, isSelected && styles.buttonTextSelected]} numberOfLines={1}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: tokens.colors.dark,
  },
  glyph: {
    position: 'absolute',
    top: tokens.spacing[12],
    right: tokens.spacing[12],
    width: 12,
    height: 12,
    borderRadius: tokens.borderRadius.full,
    backgroundColor: tokens.colors.light,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: tokens.spacing[24],
    paddingBottom: tokens.spacing[16],
    paddingHorizontal: tokens.spacing[6],
  },
  title: {
    ...tokens.textStyles.ndotHeadlineMedium,
    color: tokens.colors.light,
    textAlign: 'center',
    marginTop: tokens.spacing[12],
  },
  buttonContainer: {
    gap: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[4],
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: tokens.borderWidth[2],
    borderColor: tokens.colors.light,
    borderRadius: tokens.borderRadius['4xl'],
    paddingVertical: tokens.spacing[5],
    paddingHorizontal: tokens.spacing[8],
    alignItems: 'center',
    flexShrink: 1,
  },
  buttonSelected: {
    backgroundColor: tokens.colors.light,
  },
  buttonText: {
    ...tokens.textStyles.labelUppercasedMedium,
    color: tokens.colors.light,
    fontSize: 16,
    letterSpacing: 1.6,
    flexShrink: 1,
  },
  buttonTextSelected: {
    color: tokens.colors.dark,
  },
  statusText: {
    ...tokens.textStyles.bodySmall,
    color: tokens.colors['secondary-light'],
    textAlign: 'center',
    marginBottom: tokens.spacing[8],
  },
  violationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  violationText: {
    ...tokens.textStyles.ndotHeadlineMedium,
    color: tokens.colors.red,
  },
});