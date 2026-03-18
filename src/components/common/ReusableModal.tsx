import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ModalProps,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { colors, spacing } from '../../theme';

export interface ReusableModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonText?: string;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeButtonText = 'Close',
  containerStyle,
  contentStyle,
  titleStyle,
  ...rest
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, containerStyle]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, contentStyle]}>
              {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

              <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                {children}
              </ScrollView>

              {showCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>{closeButtonText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.bgCard || '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary || '#333333',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  body: {
    marginBottom: spacing.lg,
    maxHeight: 400, // Limit height to make it scrollable on smaller screens
  },
  closeButton: {
    backgroundColor: colors.primary || '#6200EE',
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReusableModal;
