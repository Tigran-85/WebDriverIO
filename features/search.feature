Feature: With Valid input

    Scenario Outline:  Check Search functionality for "ԲՈԼՈՐԸ" option

        Given Open web page
        When Choose section all
        When Enter Name into search field <value1>
        Then Products should be found with success message <message>
        When Click on first item apears on the screen
        Then Products with the Apple name should be found in title <value1> <value2>

        Examples:
            | value1    | value2 | message                                               |
            # | Apple     | Խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            # | Red Apple | Կարմիր | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | Red Apple | Խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | APPLE     | ԽՆՁՈՐ  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | apple     | խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | խնձոր     | apple  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | sal       | սալ    | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |