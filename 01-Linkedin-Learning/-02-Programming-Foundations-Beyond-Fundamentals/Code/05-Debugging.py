for value in range(10):
    print(value)
print('All done!')


def check_temp(temp):
    if temp < 15:
        print('Bring a jacket')
    elif temp > 25 and temp <= 35:
        print('Pack a jacket')
    elif temp > 35:
        print('Leave the jacket at home')


check_temp(10)
check_temp(30)
check_temp(37)


# def plant_recommendation(care):
#     if care = 'low':
#         print('aloe')
#     elif care == 'medium':
#         print('pothos')
#     elif care == 'medium':
#         print('orchid')

# Syntax error
# plant_rec('low')
# plant_recommendation('medium')
# plant_recommendation('high')
