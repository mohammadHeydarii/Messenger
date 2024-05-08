import {
  Avatar,
  Button,
  MyTextInput,
  ScrollingView,
  Spacing,
  Typography,
} from 'components/src';
import { createUseStyles } from 'core/src';
import React, { memo, FC, useState } from 'react';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { updateGroupName } from '../store';

interface GroupProps {
  startAdd: any;
  dispatch: any;
  setAdd: any;
  data: any;
  groupName?:any
}

const AddGroup: FC<GroupProps> = memo(
  ({ startAdd, dispatch, setAdd, data,groupName }) => {
    const { styles, colors } = useStyles();
    const { i18n } = useTranslation();
    const [textGroup, setTextGroup] = useState('');
    return (
      <>
        {!startAdd && (
          <View style={styles.initialContainer}>
            <Button
              onClick={() => {
                dispatch(setAdd(true));
              }}
              classes={styles.initialButton}
            >
              <View style={styles.buttonContinet}>
                <View>
              <AntDesign name="addusergroup" size={30} color={colors.color01} />
              </View>
              <Spacing horizontal={5} />
              <View>
              <Spacing vertical={2} />
              <Typography
                text={i18n.t('addGroup')}
                color={colors.color01}
                size={18}
              /></View>
              </View>
            </Button>
          </View>
        )}

        {startAdd && (
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.inputView}>
                <MyTextInput
                  classes={styles.input}
                  placeholder={i18n.t('groupName')}
                  value={textGroup}
                  change={(newText: any) => {
                    setTextGroup(newText)}}
                  blur={()=>{dispatch(updateGroupName(textGroup))}}
                  inlineImageLeft={
                    <AntDesign
                      name="addusergroup"
                      size={30}
                      color={colors.color01}
                    />
                  }
                />
              </View>
            </View>
            <ScrollingView>
              <View style={styles.itemsView}>
                {data?.map((item: any, index: number) => (
                  <View style={styles.item} key={index}>
                    <Avatar openImage={false} size={60} radius={50} source={''} />
                    <Spacing vertical={2} />
                    <Typography text={item} />
                  </View>
                ))}
              </View>
            </ScrollingView>
          </View>
        )}
      </>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    height: 200,
    backgroundColor: colors.secondryColorOpacity,
    borderWidth: 4,
    borderColor: colors.container,
    borderRadius: 10,
    justifyContent: 'center',
  },
  inputView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    width: '70%',
    borderWidth: 0,
    backgroundColor: colors.groupInput,
    elevation: 0,
    textAlign: 'left',
    borderRadius: 10,
    color: colors.color01,
  },
  itemsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  item: {
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  initialContainer: {
    backgroundColor: colors.container,
    padding: 10,
  },
  initialButton: {
    flexDirection: 'row',
    backgroundColor: colors.container,
    justifyContent: 'flex-start',
    padding: 5,
    elevation: 3,
    borderRadius: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.color01,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.line,
  },
  buttonContinet:{
    flexDirection:"row"
  }
}));

export { AddGroup };
