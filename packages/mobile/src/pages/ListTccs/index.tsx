import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import api from '../../services/api'
import {
  Container,
  StyledPicker,
  Header,
  HeaderTitle,
  BackButton,
  Button,
  ButtonText,
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

const ListTccs: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [course, setCourse] = useState<string | undefined>(undefined)
  const [userType, setUserType] = useState<string | undefined>(undefined)
  const [area, setArea] = useState<string | undefined>(undefined)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [tccs, setTccs] = useState<Tcc[]>([])

  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      async function getTccs() {
        const uri = `tccs?page=${page}${course ? `&course=${course}` : ''}${
          area ? `&area=${area}` : ''
        }${userType ? `&user_type=${userType}` : ''}`

        const response = await api.get(uri)

        setTccs(response.data)
      }

      getTccs()
    }, [page, course, userType, area])
  )

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="chevron-left" size={24} color="#96CFF1" />
        </BackButton>

        <HeaderTitle>Temas para TCC</HeaderTitle>
      </Header>
      <Container>
        <StyledPicker
          selectedValue={course}
          onValueChange={(itemValue, itemIndex) => {
            setCourse(itemValue ? String(itemValue) : undefined)
          }}
        >
          <StyledPicker.Item label="Selecione o curso..." value={undefined} />
          <StyledPicker.Item
            label="Sistemas de Informação"
            value="Sistemas de Informação"
          />
          <StyledPicker.Item
            label="Ciências da Computação"
            value="Ciências da Computação"
          />
          <StyledPicker.Item
            label="Ciências e Tecnologias"
            value="Ciências e Tecnologias"
          />
          <StyledPicker.Item label="Design" value="Design" />
          <StyledPicker.Item
            label="Engenharia de Computação"
            value="Engenharia de Computação"
          />
        </StyledPicker>

        {showMoreFilters && (
          <>
            <StyledPicker
              selectedValue={userType}
              onValueChange={(itemValue, itemIndex) => {
                setUserType(itemValue ? String(itemValue) : undefined)
              }}
            >
              <StyledPicker.Item
                label="Selecione o tipo de usuário..."
                value={undefined}
              />
              <StyledPicker.Item label="Discente" value="Discente" />
              <StyledPicker.Item label="Docente" value="Docente" />
            </StyledPicker>

            <StyledPicker
              selectedValue={area}
              onValueChange={(itemValue, itemIndex) => {
                setArea(itemValue ? String(itemValue) : undefined)
              }}
            >
              <StyledPicker.Item
                label="Selecione a área..."
                value={undefined}
              />
              <StyledPicker.Item label="Big Data" value="Big Data" />
              <StyledPicker.Item
                label="Internet das coisas"
                value="Internet das coisas"
              />
              <StyledPicker.Item
                label="Desenvolvimento de Software"
                value="Desenvolvimento de Software"
              />
              <StyledPicker.Item
                label="Inteligencia Artificial"
                value="Inteligencia Artificial"
              />
              <StyledPicker.Item
                label="Banco de Dados"
                value="Banco de Dados"
              />
            </StyledPicker>
          </>
        )}

        <Button onPress={() => setShowMoreFilters(!showMoreFilters)}>
          <Icon
            name={showMoreFilters ? 'minus-circle' : 'plus-circle'}
            color="#032b44"
            size={25}
          />
          <ButtonText>
            {showMoreFilters ? 'Fechar filtros...' : 'Mais filtros...'}
          </ButtonText>
        </Button>

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
            <Text style={{ fontSize: 22, textAlign: 'center' }}>
              Oops! Parece que não foi encontrado nenhum tema
            </Text>
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

export default ListTccs
