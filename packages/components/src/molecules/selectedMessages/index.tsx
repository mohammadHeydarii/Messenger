import { createUseStyles } from 'core/src';
import React, { memo } from 'react';
import { Button, Spacing, Typography } from 'components/src';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View} from 'react-native'

interface Props {
  number: any;
  onClick: any
}

const SelectedMessage = memo<Props>(({ number , onClick}) => {
  const { styles ,colors} = useStyle();
  const { i18n } = useTranslation();
  return (
    <>
      <View style={styles.container} >
        <View style={styles.numberText}>
        <Spacing horizontal={5}/>
        <Typography text={number} classes={styles.number} color={colors.white}/>
        <Spacing horizontal={5}/>
        <Typography text={i18n.t('selected')} classes={styles.text} color={colors.white}/>
        </View>
        <Button classes={styles.closeBtn} onClick={onClick}>
          <AntDesign  name={'close'} size={20} color={colors.white}/>
        </Button>
      </View>
    </>
  );
});

const useStyle = createUseStyles(({ colors, theme }) => ({
  container: {flexDirection:"row",backgroundColor:colors.color03,justifyContent:'space-between'},
  numberText:{flexDirection:"row",alignItems:"center"},
  closeBtn: {
    padding:3,
    flexDirection: 'row',
    backgroundColor: colors.color03,
    height: 40,
    alignItems: 'center',
  },
  number:{
},
  text:{
},

  
}));

export { SelectedMessage };
