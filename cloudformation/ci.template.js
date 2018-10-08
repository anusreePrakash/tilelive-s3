'use strict';
const cf = require('@mapbox/cloudfriend');


module.exports = {
  'AWSTemplateFormatVersion': '2010-09-09',
  'Description': 'tilelive-s3 build resources',
  'Resources': {
    'TravisUser': {
      'Type': 'AWS::IAM::User',
      'Properties': {
        'Policies': [
          {
            'PolicyName': 'buildList',
            'PolicyDocument': {
              'Statement': [
                {
                  'Action': [
                    's3:ListBucket'
                  ],
                  'Effect': 'Allow',
                  'Resource': [
                    'arn:aws:s3:::mapbox-node-binary'
                  ]
                }
              ]
            }
          },
          {
            'PolicyName': 'build',
            'PolicyDocument': {
              'Statement': [
                {
                  'Action': [
                    's3:DeleteObject',
                    's3:GetObject',
                    's3:GetObjectAcl',
                    's3:PutObject',
                    's3:PutObjectAcl'
                  ],
                  'Effect': 'Allow',
                  'Resource': [
                    'arn:aws:s3:::mapbox-node-binary/tilelive-s3/*'
                  ]
                }
              ]
            }
          },
          {
            'PolicyName': 'test',
            'PolicyDocument': {
              'Statement': [
                {
                  'Action': [
                    's3:DeleteObject',
                    's3:HeadObject',
                    's3:GetObject',
                    's3:GetObjectAcl',
                    's3:PutObject',
                    's3:PutObjectAcl'
                  ],
                  'Effect': 'Allow',
                  'Resource': [
                    'arn:aws:s3:::mapbox/tilelive-s3/*'
                  ]
                }
              ]
            }
          }
        ]
      }
    },
    'TravisUserKey': {
      'Type': 'AWS::IAM::AccessKey',
      'Properties': {
        'UserName': cf.ref('TravisUser')
      }
    }
  },
  'Outputs': {
    'AccessKeyId': {
      'Value': cf.ref('TravisUserKey')
    },
    'SecretAccessKey': {
      'Value': cf.getAtt('TravisUserKey', 'SecretAccessKey')
    }
  }
};
