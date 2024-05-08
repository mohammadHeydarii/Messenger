import React, { memo, useCallback, useState } from 'react';
import { Button, Line, MyTextInput, Spacing, Typography } from 'components/src';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createUseStyles, usePutUserUpdateUserProfile } from 'core/src';

interface Props {
  bioEdit: Boolean;
  nameAndFamily:any;
  userName:any;
  _bio?:any
}

const ProfileAccount = memo<Props>(({ bioEdit,nameAndFamily,userName,_bio }) => {
  const { i18n } = useTranslation();
  const { styles, colors } = useStyles();
  const [editable, setEditable] = useState(false);
  const [bio, setBio] = useState<string>("");
  const { mutate } = usePutUserUpdateUserProfile(
    {
      onSuccess:()=>{
        // refetch()
      }
    }

  );


  const userUpdate = useCallback(() => {
    mutate({
      requestBody: {
        bio,
        email:''
      },
    });
  }, [bio]);


  const handleBio = () => {
    setEditable(!editable);
  };

  const handleChangeText = (newText: any) => {
    setBio(newText);
  };

  return (
    <>
      <Typography text={i18n.t('account')} classes={styles.headerText} />

      <View style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View>
            <Typography
              text={nameAndFamily || null}
              weight={'bold'}
              color={colors.primaryColor}
            />
            <Spacing horizontal={2} />
          </View>
        </View>
        <Spacing vertical={4} />
        <View>
          <Typography text={i18n.t('fullName')} color={colors.secondryColor} />
        </View>

        <Spacing vertical={4} />
        <Line />
        <Spacing vertical={4} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Spacing horizontal={2} />
          <Typography
            text={userName || null}
            weight={'bold'}
            color={colors.primaryColor}
          />
        </View>
        <Spacing vertical={4} />
        <View>
          <Typography text={i18n.t('userName')} color={colors.secondryColor} />
        </View>
        <Spacing vertical={4} />

        <Line />

        {bioEdit ? (
          <Button onClick={handleBio}>
              {editable ? (
                <MyTextInput
                  classes={styles.input}
                  value={bio}
                  change={handleChangeText}
                  focus={true}
                  blur={() => {
                    setEditable(false)
                   userUpdate()
                  }}
                />
              ) : (
                <>
                <Spacing vertical={4} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Typography
                        text={_bio || bio}
                        weight={'bold'}
                        color={colors.primaryColor}
                      />
                    </View>
                  </View>
                  <Spacing vertical={4} />
                  <Typography
                    text={i18n.t('bio')}
                    color={colors.secondryColor}
                  />
                </>
              )}
          </Button>
        ) : (
          <>
          <Spacing vertical={4} />
          <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
            <View>
              <Typography
                text={_bio || null}
                weight={'bold'}
                color={colors.primaryColor}
              />
            </View>
            </View>
            <Spacing vertical={4} />
            <Typography
              text={i18n.t('bio')}
              color={colors.secondryColor}
              />
              </>
        )}
        </View>
    </>
  );
});
const useStyles = createUseStyles(({ theme, colors }) => ({
  box: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.drawerHeaderBox,
  },
  input: {
    padding: 5,
    width: '100%',
    zIndex: 3,
    maxHeight: 40,
    backgroundColor: colors.bioInput,
  },
  headerText: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.color01,
    fontWeight: 'bold',
  },
}));

export { ProfileAccount };
