import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  TccsList,
  TccContainer,
  TccAvatar,
  TccInfo,
  TccMeta,
  TccMetaText,
  TccName,
  PageIndicatorContainer
} from './styles'

export interface Creator {
  id: string
  avatar_url: string
}

export interface Tcc {
  id: string
  suggestion: string
  course: string
  area: string
  links: string
  description: string
  creator: Creator
}

const MyFavoriteTccs: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [tccs, setTccs] = useState<Tcc[]>([])

  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      async function getTccs() {
        const uri = `tccs/favorites/me?page=${page}`

        const response = await api.get(uri)

        setTccs(response.data)
      }

      getTccs()
    }, [page])
  )

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#96CFF1" />
        </BackButton>

        <HeaderTitle>Meus Temas Favoritos</HeaderTitle>
      </Header>
      <Container>
        {tccs.length > 0 ? (
          <TccsList
            data={tccs}
            keyExtractor={tcc => tcc.id}
            renderItem={({ item: tcc }) => (
              <TccContainer
                onPress={() =>
                  navigation.navigate('DetailTcc', { tcc_id: tcc.id })
                }
              >
                <TccAvatar
                  source={{
                    uri:
                      (tcc && tcc.creator && tcc.creator.avatar_url) ||
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }}
                />

                <TccInfo>
                  <TccName>{tcc.suggestion}</TccName>

                  <TccMeta>
                    <Icon name="book" size={14} color="#96cff1" />
                    <TccMetaText>{tcc.course}</TccMetaText>
                  </TccMeta>

                  <TccMeta>
                    <Icon name="archive" size={14} color="#96cff1" />
                    <TccMetaText>{tcc.area}</TccMetaText>
                  </TccMeta>
                </TccInfo>
              </TccContainer>
            )}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 22 }}>Não há temas favoritados</Text>
          </View>
        )}

        <PageIndicatorContainer>
          <TouchableOpacity
            onPress={() => {
              if (page > 1) {
                setPage(page - 1)
              }
            }}
          >
            <Icon name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#fff' }}>{page}</Text>
          <TouchableOpacity
            onPress={() => {
              setPage(page + 1)
            }}
          >
            <Icon name="arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </PageIndicatorContainer>
      </Container>
    </>
  )
}

export default MyFavoriteTccs
